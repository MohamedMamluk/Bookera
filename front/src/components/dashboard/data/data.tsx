import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon as CheckCircledIcon,
  CircleIcon,
  CrossIcon as CrossCircledIcon,
  BookMarked as QuestionMarkCircledIcon,
  WatchIcon as StopwatchIcon,
} from 'lucide-react';

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
];

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: CircleIcon,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: StopwatchIcon,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircledIcon,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
];
export const categories = [
  {
    label: 'HISTORY',
    value: 'HISTORY',
    icon: ArrowDownIcon,
  },
  {
    label: 'FICTION',
    value: 'FICTION',
    icon: ArrowDownIcon,
  },
  {
    label: 'NON_FICTION',
    value: 'NON_FICTION',
    icon: ArrowDownIcon,
  },
  {
    label: 'ROMANCE',
    value: 'ROMANCE',
    icon: ArrowDownIcon,
  },
  {
    label: 'DRAMA',
    value: 'DRAMA',
    icon: ArrowDownIcon,
  },
  {
    label: 'FINANCE',
    value: 'FINANCE',
    icon: ArrowDownIcon,
  },
];
