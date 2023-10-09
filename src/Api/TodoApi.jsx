import customAxois from "./CustomAxois"


export default {

    Getall: async () => {
        const response = await customAxois.get("/")
        const data = await response
        return data.data
    },
    GetOne: async (id) => {
        const response = await customAxois.get(`/${id}`)
        const data = await response
        return data.data
    },
    Add: async (Todo) => {
        const response = await customAxois.post("/", Todo)
        console.log(response);
    },
    delete: async (id) => {
        const response = await customAxois.delete(`/${id}`)
        return response
    },
    Update: async (Todo) => {
         await customAxois.put(`/${parseInt(Todo.id)}`, Todo)

    },
}