import { pedirsetButtons } from "../../modules/pedirset";
import { back } from "./back";
import { close } from "./close";


export const buttons = {
  close,
  back,
  ...pedirsetButtons,
};
