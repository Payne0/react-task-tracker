import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return tasks.map((task) => (
    <h3 key={task.id}>
      <Task task={task} onDelete={onDelete} onToggle={onToggle} />
    </h3>
  ));
};

export default Tasks;
