import { getData } from "../common/Apicall"

export const fetchAllTasks = () => {
    return getData("/api/v1/fetchAllTasks");
}