import { React } from "react";
import { Route } from "react-router-dom";

import "../styles/pages/areaatleta.css";
import PlanosAtletaPage from "./atleta/planos/PlanosAtletaPage";

export default function AreaAtleta() {
  return (
    <>
      <div className="areaatleta-header">
        <span>Area do atleta</span>
      </div>

      <div className="areaatleta-body">
        <Route path="/app/atleta/planos">
          <PlanosAtletaPage />
        </Route>
      </div>
    </>
  );
}
