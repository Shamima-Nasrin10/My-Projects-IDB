import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private openSubMenus: Set<string> = new Set();

  toggleSubMenu(item: string): void {
    if (this.openSubMenus.has(item)) {
      this.openSubMenus.delete(item);
    } else {
      this.openSubMenus.add(item);
    }
  }

  isSubMenuOpen(item: string): boolean {
    return this.openSubMenus.has(item);
  }
}
