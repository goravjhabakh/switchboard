/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useSuspenseWorkflow } from "@/hooks/use-workflows";
import { ErrorView, LoadingView } from "../entity-components";
import { useState, useCallback, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Panel,
} from "@xyflow/react";
import type {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NodeComponents } from "@/lib/workflows/node-components";
import { AddNodeButton } from "./add-node-button";

export const EditorLoading = () => {
  return <LoadingView message="Loading editor..." />;
};

export const EditorError = () => {
  return <ErrorView message="Error loading editor!" />;
};

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const { theme } = useTheme();
  // State to track if the component has mounted on the client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
  const [edges, setEdges] = useState<Edge[]>(workflow.edges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) return <EditorLoading />;

  return (
    <div className="size-full">
      <ReactFlow
        colorMode={theme as "light" | "dark" | "system"}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={NodeComponents}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right">
          <AddNodeButton />
        </Panel>
      </ReactFlow>
    </div>
  );
};
