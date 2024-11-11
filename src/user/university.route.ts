import { Router } from 'express';
import { type Uni } from '../types';

export const universityRouter = Router();

export const universities: Uni[] = [
  { id: 1, name: 'Technical University', code: 'TU' },
  { id: 2, name: 'University of National and Worldwide Economy', code: 'UNWE' },
  { id: 3, name: 'Sofia University', code: 'SU' },
  { id: 4, name: 'New Bulgarian University', code: 'NBU' }
]
universityRouter.get('/', (req, res) => {
  res.json(universities);
});

universityRouter.get('/:id', (req, res) => {
  const universityId = parseInt(req.params.id);
  const university = universities.find((uni) => uni.id === universityId);
  if (university) {
    res.json(university);
  } else {
    res.status(404).json({ message: 'University not found' });
  }
});

universityRouter.post('/', (req, res) => {
  const newUniversity = {
    id: universities.length + 1,
    name: req.body.name,
    code: req.body.code,
  };
  universities.push(newUniversity);
  res.status(201).json(newUniversity);
});

// PUT to update an existing user
universityRouter.put('/:id', (req, res) => {
  const universityId = parseInt(req.params.id);
  const universityIndex = universities.findIndex((uni) => uni.id === universityId);
  if (universityIndex !== -1) {
    universities[universityIndex] = {
      id: universityId,
      name: req.body.name,
      code: req.body.code,
    };
    res.json(universities[universityIndex]);
  } else {
    res.status(404).json({ message: 'University not found' });
  }
});

// DELETE a user by ID
universityRouter.delete('/:id', (req, res) => {
  const universityId = parseInt(req.params.id);
  const universityIndex = universities.findIndex((u) => u.id === universityId);
  if (universityIndex !== -1) {
    const deletedUser = universities.splice(universityIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'University not found' });
  }
});

