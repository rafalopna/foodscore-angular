import { CanDeactivateFn } from "@angular/router";
import { Observable } from "rxjs";

export interface CanDeactivateComponent {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const leavePageGuard: CanDeactivateFn<CanDeactivateComponent> = (component) => {
  return component.canDeactivate? component.canDeactivate() : true;
};
