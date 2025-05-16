import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { addIcon } from '../../assets/addIcon';
import './NoteApp.css'
import { fetchAllTasks } from '../../API/TaskApi';
import NoteIcon from '../../assets/NoteIcon.png';

// add same url in which backend is running on
const socket = io(process.env.REACT_APP_ENDPOINT);

const NoteApp = () => {
    const [taskName, setTaskName] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [refetch, setRefetch] = useState(false);

    const handleAdd = () => {
        if (taskName) {
            socket.emit('add', taskName);
            setTaskName('');
            setRefetch(!refetch);
        }
    };

    // fetch api
    useEffect(() => {
        const getApiData = async () => {
            const response = await fetchAllTasks();

            if (response?.success)
                setTaskList(response?.allTaskList);
        }

        getApiData();
    },[refetch]);

    return (
        <div className="h-screen flex justify-center items-center px-4">
            <div className="p-6 bg-white rounded shadow-full max-w-[480px] w-full">
                <div className='flex item-center gap-x-2 mb-2'>
                    <img 
                        src={NoteIcon}
                        className='w-[40px] h-[40px]'
                    />
                    <h2 className="text-[30px] font-extrabold text-left">Note App</h2>
                </div>
                <div className="flex flex-row gap-3 justify-center">
                    <input
                        type="text"
                        maxLength={100}
                        placeholder="New Note..."
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        className="border p-2 w-full rounded"
                    />
                    <div onClick={handleAdd} className="flex cursor-pointer justify-center items-center gap-x-1 bg-brown p-4 rounded h-12 w-[100px]">
                        {addIcon}
                        <button
                            className="font-extrabold text-white w-full"
                        >
                            Add
                        </button>
                    </div>
                </div>
                {/* List section */}
                <div className="h-[340px] p-4">
                    <h2 className="text-[16px] font-semibold">Notes</h2>
                    <div className="w-full border-t my-2" />
                    <div className="overflow-y-auto h-[280px]">
                        {taskList.map((data: any, index) => (
                            <div key={index} className='relative'>
                                <div className="py-2">{data.taskName}</div>
                                <div className="absolute text-[10px] right-0 bottom-0 pr-2"
                                    style={{ 
                                        color: data.storeage === "redis" ? "red" : "green"
                                    }}
                                >
                                    {data.storeage}
                                </div>
                                <div className="w-full border-t my-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteApp;
