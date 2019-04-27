import {style, state, transition, animate, trigger, group} from '@angular/animations';

export const routeanimation = trigger('route', [
  state('void', style({position: 'fixed', height: '80%', width: '100%'})),
  state('*', style({position: 'fixed', height: '80%', width: '100%'})),
  transition('void => *', [
    style({transform: 'translateX(-100%)', opacity: 0}),
    group([
      animate('0.5s ease-in-out', style({transform: 'translateX(0)'})),
      animate('0.3s ease-in', style({opacity: 1}))
    ])
  ]),
  transition('* => void', [
    style({transform: 'translateX(0)', opacity: 1}),
    group([
      animate('0.5s ease-in-out', style({transform: 'translateX(100%)'})),
      animate('0.3s ease-out', style({opacity: 0}))
    ])
  ]),
]);
