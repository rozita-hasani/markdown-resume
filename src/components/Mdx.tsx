import {MDXRemote} from "next-mdx-remote/rsc";
import React from "react";

type CustomMDXProps = {
    source: string
}

export function CustomMDX(props: CustomMDXProps) {
    return <MDXRemote source={props.source} />;
}