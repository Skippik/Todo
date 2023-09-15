import {useRef, useState} from 'react';
import {Task} from '../../types';
import {Button, Input, InputRef, Segmented, Tag, notification} from 'antd';
import {Config} from '../../config';
import {
  PlusCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import TaskItem from '../../UI/Task';

const MainPages = () => {
  //
  const inputRef = useRef<InputRef>(null);
  //
  const [tasks, setTasks] = useState<Task[]>(Config.emptyTasks);
  const [filter, setFilter] = useState<string | number>('All');
  const [input, setInput] = useState<string>('');

  const clearTaskCompleate = () => {
    setTasks(value => value.filter(t => !t.compleate));
  };

  const addtask = () => {
    if (input.length === 0) {
      notification.error({
        message: 'Please enter a task name',
      });
      inputRef.current?.focus();
      return;
    }

    const newTask: Task = {
      id: tasks.length + 1,
      title: input,
      compleate: false,
    };

    setTasks(value => [...value, newTask]);
    notification.success({
      message: `Task# ${newTask.id} successfully added`,
    });
    setInput('');
  };

  return (
    <div className='td-wrapper'>
      <h1 className='td-tasks__title'>{'TODOS'}</h1>
      <div className='td-tasks__wrapper'>
        <div className='td-tasks__input-wrapper'>
          <Input
            value={input}
            ref={inputRef}
            onChange={value => {
              setInput(value.target.value);
            }}
            onKeyDown={event => {
              if (event.code === 'Enter') {
                addtask();
              }
            }}
            className='td-tasks__input'
            placeholder='Please input task'
          />
          <Button type='primary' onClick={addtask} className='td-task__btn'>
            {<PlusCircleOutlined />}
          </Button>
        </div>
        <div className='td-tasks'>
          {tasks.length ? (
            <>
              {tasks.map(task => {
                if (filter === 'Active') {
                  return (
                    <>
                      {task.compleate && (
                        <TaskItem
                          key={task.id}
                          task={task}
                          setTasks={setTasks}
                        />
                      )}
                    </>
                  );
                } else if (filter === 'Compleate') {
                  return (
                    <>
                      {!task.compleate && (
                        <TaskItem
                          key={task.id}
                          task={task}
                          setTasks={setTasks}
                        />
                      )}
                    </>
                  );
                }
                return (
                  <TaskItem key={task.id} task={task} setTasks={setTasks} />
                );
              })}
            </>
          ) : (
            <div className='td-tasks__empty'>{'the Task list is empty'}</div>
          )}
        </div>
        <div className='td-filters'>
          <Tag color={'#87d068'} className='td-filters__info'>{`${
            tasks.filter(t => t.compleate === true).length
          }: items Complete`}</Tag>
          <div className='td-filters__filter'>
            <Segmented
              onChange={value => {
                setFilter(value);
              }}
              options={[
                {label: 'All', value: 'All'},
                {label: 'Сompleted', value: 'Active', icon: <CheckOutlined />},
                {
                  label: 'not fulfilled',
                  value: 'Compleate',
                  icon: <CloseOutlined />,
                },
              ]}
            />
          </div>
          <div className='td-filter__clear'>
            <Button onClick={clearTaskCompleate} type='text'>
              {'Clear compleate'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPages;
