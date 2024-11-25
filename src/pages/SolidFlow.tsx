import { Component, createEffect, createSignal, onMount } from "solid-js";
import { Node, Edge, SolidFlow } from "solid-flow";
import styles from "./styles.module.css";

export const SolidFlowSample: Component = () => {
    const [nodes, setNodes] = createSignal<Node[]>([]);
    const [edges, setEdges] = createSignal<Edge[]>([]);

    onMount(() => {
        const initialNodes = [
            {
                id: "node-1",
                position: { x: 50, y: 100 },
                data: {
                    label: "Toolbar",
                    content: (
                        <div style={{ display: "flex", "flex-direction": "column", gap: "12px" }}>
                            <button
                                class={styles.button}
                                onClick={() => {
                                    const randomId = Math.floor(Math.random() * 10000).toString();
                                    setNodes([
                                        ...nodes(),
                                        {
                                            id: "node-$" + randomId.toString(),
                                            position: { x: 200, y: 200 },
                                            data: {
                                                label: "Node " + randomId.toString(),
                                                content: <p>Simple Node with delete action</p>,
                                            },
                                            inputs: 2,
                                            outputs: 2,
                                            actions: { delete: true },
                                        },
                                    ]);
                                }}
                            >
                                Add node
                            </button>
                        </div>
                    ),
                },
                inputs: 0,
                outputs: 0,
            },{
                id: "node-2",
                position: { x: 50, y: 230 },
                data: {
                    label: "Item",
                    content: (
                        <span>An item</span>
                    ),
                },
                inputs: 0,
                outputs: 0,
            },
        ];
        setNodes([...nodes(), ...initialNodes]);
    });

    return (
        <div class={styles.main}>
            <SolidFlow
                nodes={nodes()}
                edges={edges()}
                onNodesChange={(newNodes: Node[]) => {
                    setNodes(newNodes);
                }}
                onEdgesChange={(newEdges: Edge[]) => {
                    setEdges(newEdges);
                }}
            />
        </div>
    );
};
