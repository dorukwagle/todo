import ModelReturnTypes from "../../entities/ModelReturnTypes";
import PaginationReturnTypes from "../../entities/PaginationReturnTypes";
import formatValidationErrors from "../../utils/formatValidationErrors";
import prismaClient from "../../utils/prismaClient";
import Todo, { TodoType } from "../../validations/Todo";
import TodoParams, { TodoParamsType } from "../../validations/TodoParams";
import UpdateTodo, { UpdateTodoType } from "../../validations/UpdateTodo";

const createTodo = async (userId: string, body: TodoType) => {
    const res = { statusCode: 201 } as ModelReturnTypes;

    const validation = Todo.safeParse(body);

    const error = formatValidationErrors(validation);
    if (error) return error;

    const data = validation.data!;

    res.data = await prismaClient.todos.create({
        data: {
            ...data,
            userId,
        },
    });

    return res;
};

const updateTodo = async (userId: string, body: UpdateTodoType) => {
    const res = { statusCode: 404 } as ModelReturnTypes;

    const validation = UpdateTodo.safeParse(body);
    const error = formatValidationErrors(validation);
    if (error) return error;

    const todo = await prismaClient.todos.findUnique({
        where: {
            userId,
            todoId: validation.data!.todoId,
        },
    });

    if (!todo) {
        res.error = { error: "Todo not found" };
        return res;
    }

    const data = validation.data!;

    res.data = await prismaClient.todos.update({
        where: {
            todoId: todo.todoId,
        },
        data,
    });

    res.statusCode = 200;
    return res;
};

const deleteTodo = async (userId: string, todoId: string) => {
    await prismaClient.todos.update({
        where: {
            userId,
            todoId,
        },
        data: {
            deletedAt: new Date(),
        }
    });
};

const getFilter = (userId: string, filter: TodoParamsType) => {
    const seed = filter.seed;
    const status = filter.status;

    const noSeed = { userId, status };
    const withSeed = {
        AND: [
            {
                userId,
                status,
                OR: [
                    {
                        title: {
                            search: seed,
                        },
                        body: {
                            search: seed,
                        },
                    },
                ],
            },
        ],
    };

    return seed ? withSeed : noSeed;
};

const paginateTodos = async (userId: string, body: TodoParamsType) => {
    const res = { statusCode: 200, info: {}, data: {}} as PaginationReturnTypes;

    const validation = TodoParams.safeParse(body);
    const error = formatValidationErrors(validation);
    if (error) {
        res.statusCode = error.statusCode;
        res.error = error.error;
        return res;
    };

    const filter = validation.data!;

    const page = filter.page || 1;
    const pageSize = filter.pageSize || parseInt(process.env.PAGE_SIZE || "10");


    res.data = await prismaClient.todos.findMany({
        where: getFilter(userId, filter),
        orderBy: filter.seed
            ? {
                  _relevance: {
                      fields: ["title", "body"],
                      search: filter.seed || "",
                      sort: "asc",
                  },
              }
            : {
                  createdAt: "desc",
              },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const total = await prismaClient.todos.count({
        where: getFilter(userId, filter),
    });

    res.info.itemsCount = total;
    res.info.hasNextPage = total > (page * pageSize);

    return res;
};

export { createTodo, updateTodo, deleteTodo, paginateTodos };
