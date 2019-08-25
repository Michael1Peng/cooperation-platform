import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * @description this function is to load the added svg resources
 * @param ir a component to register svg icon to corresponding name
 * @param ds a component to generate url
 */
export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = 'assets/img';
  const sidebarDir = `${imgDir}/sidebar`;
  const daysDir = `${imgDir}/days`;
  const avatarDir = `${imgDir}/avatar`;
  const iconsDir = `${imgDir}/icons`;
  ir.addSvgIcon('day', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`));
  ir.addSvgIcon('week', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`));
  ir.addSvgIcon('month', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`));
  ir.addSvgIcon('project', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`));
  ir.addSvgIcon('projects', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`));
  ir.addSvgIconSetInNamespace('avatars', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));
  ir.addSvgIcon('unassigned', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/unassigned.svg`));
  const days = [];
  for (let i = 1; i < 32; i++) {
    days.push(i);
  }
  days.forEach(d => ir.addSvgIcon(`day${d}`, ds.bypassSecurityTrustResourceUrl(`${daysDir}/day${d}.svg`)));
  const icons = ['add', 'burger-navigation', 'delete', 'hand-grab-o', 'move'];
  icons.forEach(i => ir.addSvgIcon(`${i}`, ds.bypassSecurityTrustResourceUrl(`${iconsDir}/${i}.svg`)));
};
