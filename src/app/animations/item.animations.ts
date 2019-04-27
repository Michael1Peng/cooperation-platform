import {style, state, transition, animate, trigger} from '@angular/animations';

export const itemanimation = trigger('item', [
  state('out', style({'border-left-width': '3px'})),
  state('hover', style({'border-left-width': '8px'})),
  transition('out => hover', animate('100ms ease-in')),
  transition('hover => out', animate('100ms ease-out'))
]);
