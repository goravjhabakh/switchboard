import type { NodeTypes } from "@xyflow/react";
import { NodeType } from "../generated/prisma/enums";
import { InitialNode } from "@/components/editor/intial-node";

export const NodeComponents = {
  [NodeType.INITIAL]: InitialNode
} as const satisfies NodeTypes

export type RegisteredNodeType = keyof typeof NodeComponents