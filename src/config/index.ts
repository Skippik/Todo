import {Task} from '../types';

export const Config = {
  emptyTasks: [
    {
      id: 1,
      title: 'Задача 1',
      compleate: false,
    },
    {
      id: 2,
      title: 'Задача 2',
      compleate: true,
    },
    {
      id: 3,
      title: 'Задача 3',
      compleate: false,
    },
    {
      id: 4,
      title: 'Задача 4',
      compleate: true,
    },
    {
      id: 5,
      title: 'Задача 5',
      compleate: true,
    },
  ] as Task[],
};
