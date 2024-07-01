import TaskBox from "@/components/TaskBox";

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary-color pt-20 pb-10">
      <div className="px-12 py-5">
        <div className="text-2xl font-bold">Project Name</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 px-2 py-5">
          <div className="w-full">
            <div className="text-2xl">To Do</div>
            <hr className="border-black border-2 mb-2" />
            <TaskBox title="Task 1" type="task" />
            <TaskBox title="+ Add a task" type="add" />
          </div>
          <div className="w-full">
            <div className="text-2xl">Doing</div>
            <hr className="border-black border-2 mb-2" />
            <TaskBox title="Task 2" type="task" />
          </div>
          <div className="w-full">
            <div className="text-2xl">Done</div>
            <hr className="border-black border-2 mb-2" />
            <TaskBox title="Task 3" type="task" />
          </div>
        </div>
      </div>
    </main>
  );
}
