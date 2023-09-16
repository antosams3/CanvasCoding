import * as React from 'react';
import { FollowPathBehavior, GameEntity, Path, Vector3, EntityManager } from 'yuka';
import { useFrame } from "@react-three/fiber";

const context = React.createContext();

export function Manager({ children }) {
    const [mgr] = React.useState(() => new EntityManager());

    React.useEffect(() => {
        const vehicle = mgr.entities.find((item) => item.name === 'Cone');
        const path = new Path();
        path.add(new Vector3(0, 0, 0));
        path.add(new Vector3(-4, 0, 4));
        path.add(new Vector3(-6, 0, 0));
        path.add(new Vector3(-4, 0, -4));
        path.loop = true;

        // const position = [];
        // path._waypoints.forEach((waypoint)=>{
        //     position.push(waypoint.x, waypoint.y, waypoint.z)
        // });


        vehicle.position.copy(path.current())

        const followPathBehaviour = new FollowPathBehavior(path, 0.5);
        followPathBehaviour.active = true;
        followPathBehaviour.path = path;

        vehicle.steering.add(followPathBehaviour);
        vehicle.maxSpeed = 3;


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useFrame((state, delta) => mgr.update(delta))

    return <context.Provider value={mgr}>{children}</context.Provider>

}

export function useYuka({
    type = GameEntity,
    position = [0, 0, 0],
    name = 'unnamed'
}) {
    const ref = React.useRef();                                             // Mesh reference (Vehicle mesh)
    const mgr = React.useContext(context);
    const [entity] = React.useState(() => new type())                       // Entity = Vehicle (YUKA)                  

    React.useEffect(() => {
        entity.position.set(...position)
        entity.name = name
        entity.setRenderComponent(ref, (entity) => {                          // Matches sync function
            ref.current.position.copy(entity.position);
            ref.current.quaternion.copy(entity.rotation);
        })
        mgr.add(entity)                                                     // Add Vehicle to EM
        return () => mgr.remove(entity)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [ref, entity]
}