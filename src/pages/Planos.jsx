import { React, useState } from "react";
import Button from "../components/Button/Button";
import { UserContext } from "../components/Context";
import PlanosAtletaPage from "./atleta/planos/PlanosAtletaPage";
import PlanosTreinadorPage from "./treinador/planos/PlanosTreinadorPage";

import "./../styles/pages/planos.css";
import PlanosAdminPage from "./admin/planos/PlanosAdminPage";

export default function Planos() {
  const [planosIsShowing, setPlanosIsShowing] = useState({
    atleta: false,
    treinador: false,
    admin: false,
  });

  return (
    <>
      <UserContext.Consumer>
        {(user) => {
          return (
            <div className="planos-treino">
              <div className="planos-treino-header">
                <div className="planos-treino-header-title">
                  Planos de Treino
                </div>
                <div className="planos-treino-header-subtitle">
                  {user.roles.atleta ? (
                    <div className="planos-treino-header-btn">
                      <Button
                        title="Meus planos"
                        styleType={
                          planosIsShowing.atleta ? "secondary" : "primary"
                        }
                        onClick={() => {
                          setPlanosIsShowing({
                            treinador: false,
                            atleta: !planosIsShowing.atleta,
                            admin: false
                          });
                        }}
                      />
                    </div>
                  ) : null}
                  {user.roles.treinador ? (
                    <div className="planos-treino-header-btn">
                      <Button
                        title="Planos treinador"
                        styleType={
                          planosIsShowing.treinador ? "secondary" : "primary"
                        }
                        onClick={() => {
                          setPlanosIsShowing({
                            atleta: false,
                            treinador: !planosIsShowing.treinador,
                            admin: false
                          });
                        }}
                      />
                    </div>
                  ) : null}
                  {user.roles.admin ? (
                    <div className="planos-treino-header-btn">
                      <Button
                        title="Planos Administrador"
                        styleType={
                          planosIsShowing.admin ? "secondary" : "primary"
                        }
                        onClick={() => {
                          setPlanosIsShowing({
                            atleta: false,
                            admin: !planosIsShowing.admin,
                            treinador: false
                          });
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="planos-treino-body">
                {planosIsShowing.atleta ? (
                  <div>
                    <PlanosAtletaPage user={user}/>
                  </div>
                ) : null}
                {planosIsShowing.treinador ? (
                  <div>
                    <PlanosTreinadorPage user={user}/>
                  </div>
                ) : null}
                {planosIsShowing.admin ? (
                  <div>
                    <PlanosAdminPage user={user}/>
                  </div>
                ) : null}
              </div>
            </div>
          );
        }}
      </UserContext.Consumer>
    </>
  );
}
