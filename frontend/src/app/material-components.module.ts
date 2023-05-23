import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatTableModule],
  exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatTableModule],
})
export class MaterialComponentsModule {}
