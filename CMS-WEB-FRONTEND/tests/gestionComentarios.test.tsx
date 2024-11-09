import React from 'react';
import { expect, it, describe, beforeEach, test } from 'vitest'
import {  render, screen,  within } from '@testing-library/react'
import { TestComponent } from './utils/TestComponent';
import GestionUsuarios from '../src/pages/dashboard/gestionUsuarios/index';
import userEvent from '@testing-library/user-event';


test('renderiza el nombre del comentario')