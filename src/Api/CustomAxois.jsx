import axios from "axios";

const customAxois=axios.create({
    baseURL:'http://localhost:8000/Todos',

    

})

export default customAxois