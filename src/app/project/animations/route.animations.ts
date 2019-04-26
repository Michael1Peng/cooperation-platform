import {style, state, transition, animate, trigger} from '@angular/animations';

export const routeanimation = trigger('route', [
  state('void', style({position: 'fixed', height: '80%', width: '100%'})),
  state('*', style({position: 'fixed', height: '80%', width: '100%'})),
  transition('void => *', [
    style({  transform: 'translateX(-100%)'}),
    animate('0.5 ease-in-out', style({transform: 'translateX(0)'}))
  ]),
  transition('* => void', [
    style({  transform: 'translateX(0)'}),
    animate('0.5 ease-in-out', style({transform: 'translateX(100%)'}))
  ]),
]);
