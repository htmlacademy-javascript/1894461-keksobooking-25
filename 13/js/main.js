import './map.js';
import {resetForm} from './form.js';
import {setFormSubmit} from './validation.js';
import { getData } from './api.js';

getData();

setFormSubmit(resetForm);
