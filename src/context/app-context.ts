import {GistService} from "../services/gist-service";
import React from "react";

export interface IAppContext {
  gistService: GistService;
}

export const AppContext = React.createContext({} as IAppContext);
