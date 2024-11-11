import { Router } from 'express';
import { User } from '../types';
import { universities } from './university.route';

export const userRouter = Router();

let users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    university: universities[0],
    subjects: ['Math', 'Physics']
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    university: universities[1],
    subjects: ['Networking', 'Hardware']
  },
];

userRouter.get('/', (req, res) => {
  res.json(users);
});

userRouter.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT to update an existing user
userRouter.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = {
      id: userId,
      name: req.body.name,
      email: req.body.email,
    };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE a user by ID
userRouter.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.patch('/:id/update-university', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    const universityId = parseInt(req.body.universityId);
    const universityIndex = universities.findIndex((uni) => uni.id === universityId);
    if (universityIndex !== -1) {
      users[userIndex].university = universities[universityIndex]
      res.json(users[userIndex])
    } else {
      res.status(404).json({ message: 'University not found' });
    }

  } else {
    res.status(404).json({ message: 'User not found' });
  }
})

userRouter.patch('/:id/update-subjects', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    const newSubjects = req.body.subjects as string[]
    if (newSubjects.length > 0) {
      users[userIndex].subjects = newSubjects
      res.json(users[userIndex])
    } else {
      res.status(404).json({ message: 'Empty subjects could not be passed' });
    }

  } else {
    res.status(404).json({ message: 'User not found' });
  }
})