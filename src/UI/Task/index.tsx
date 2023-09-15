import {Checkbox} from 'antd';
import {Task} from '../../types';
import classNames from 'classnames';
import {useCallback, useEffect, useState} from 'react';

interface TaskItemProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  task: Task;
}

const TaskItem = ({setTasks, task}: TaskItemProps) => {
  const [checked, setChecked] = useState<boolean>(task.compleate);

  const taskChecked = useCallback(() => {
    setTasks(tasks => {
      const updatedTasks = tasks.map(t =>
        t.id === task.id ? {...t, compleate: checked} : t,
      );
      return updatedTasks;
    });
  }, [checked, setTasks, task.id]);

  useEffect(() => taskChecked(), [checked, taskChecked]);

  return (
    <div
      onClick={() => {
        setChecked(ch => !ch);
      }}
      className={classNames('td-task__wrapper', {
        compleate: task.compleate,
      })}>
      <Checkbox
        className='td-task__checkbox'
        checked={task.compleate}
        // onChange={(e: CheckboxChangeEvent) => {
        //   setChecked(e.target.value);
        // }}
      />
      <div className='td-task__title'>{task.title}</div>
    </div>
  );
};

export default TaskItem;
