import { useState } from "react";

import TaskCard from "@/Components/taskCard";
import Button from "../Components/button";

export default function Tasks() {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'My name is', coinYield: 50, description: 'Complete your profile to earn coins.', checked: false, type: 'daily' },
        { id: 2, title: 'Slenderman', coinYield: 100, description: 'Finish your first quest to get started.', checked: true, type: 'daily' },
        { id: 3, title: 'Collect my pages', coinYield: 20, description: 'Log in daily to receive rewards.', checked: false, type: 'daily' },
        { id: 4, title: 'Haunted Forest', coinYield: 200, description: 'Complete all daily tasks for the week.', checked: false, type: 'weekly' },
        { id: 5, title: 'Ghost Hunt', coinYield: 150, description: 'Invite a friend to join the platform.', checked: true, type: 'weekly' },
        { id: 6, title: 'Spooky Mansion', coinYield: 300, description: 'Participate in a community event.', checked: false, type: 'weekly' },
    ]);

    const handleToggle = (id, checked) =>  {
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, checked} : task)))
    }

    const dailyTasks = tasks.filter(task => task.type === 'daily');
    const weeklyTasks = tasks.filter(task => task.type === 'weekly');
    
    return (
        <>
            {/* background */}
            <div className="min-h-screen bg-[#087592]">
                <div className="flex justify-center">
                    {/* foreground */}
                    <div className="w-[90%] max-w-[1600px] min-h-screen flex justify-center p-16 bg-[#F9FEFF] backdrop-blur-sm border border-white/20 shadow-2xl">
                        <div className="w-full grid gap-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 items-start">
                            {/* daily tasks */}
                            <div className=" p-3 bg-[#C0DEE5] rounded-sm">
                                <h1 className="text-3xl font-poppins font-semibold text-gray-800 mb-4">Daily</h1>
                                <div className="flex flex-col gap-3">
                                    {dailyTasks.map((task) => (
                                        <TaskCard key={task.id} {...task} onToggle={(checked) => handleToggle(task.id, checked)}/>
                                    ))}
                                </div>
                            </div>
                            {/* weekly tasks */}
                            <div className="p-3 bg-[#C0DEE5] rounded-sm">
                                <h1 className="text-3xl font-poppins font-semibold text-gray-800 mb-4">Weekly</h1>
                                <div className="flex flex-col gap-3">
                                    {weeklyTasks.map((task) => (
                                        <TaskCard key={task.id} {...task} onToggle={(checked) => handleToggle(task.id, checked)}/>
                                    ))}
                                </div>
                            </div>
                            {/* lootbox panel */}
                            <div className="p-3 bg-[#C0DEE5] rounded-sm">
                                <h1 className="text-3xl font-poppins font-semibold text-gray-800 mb-4 pt-0">Buy a Box</h1>
                                <div className="w-[80%] items-center justify-center flex flex-col mx-auto">
                                    <img src="Assets/present-box.png" alt="Lootbox" className="h-50 w-50 mt-20" />

                                    <div className="flex gap-1 pt-2">
                                        <img src="Assets/coin.png" alt="Coin" className="h-7 w-7"/>
                                        <div className="text-white text-xl font-poppins font-bold">
                                            999
                                        </div>
                                    </div>  

                                    <Button variant="secondary" className="font-semibold text-xl my-16">Buy and open</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}