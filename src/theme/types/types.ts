/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PropsWithChildren } from "@rbxts/react";
import { WriteableStyle } from "theme/interfaces";

export interface CommonProps<T extends Instance> extends PropsWithChildren {
	className?: WriteableStyle<T>;
	component?: T;
	id?: React.Key;
	ref?: React.Ref<T>;
}

export type BaseDefaultProps<T extends Instance, P> = CommonProps<T> & P;

export type BaseCustomizedProps<T extends Instance, P> = BaseDefaultProps<T, P>;

export type DefaultProps<T extends Instance, P = {}> = BaseDefaultProps<T, P>;

export type CustomizedProps<T extends Instance, P = {}> = BaseCustomizedProps<T, P>;

export type CustomizedRef<T extends Instance> = T extends Instance
	? any
	: T extends keyof React.ReactElement<T>
	? WritableInstanceProperties<T>
	: never;

export type CustomizedForwardRefComponent<D extends Instance, P = {}> = <T extends Instance = D>(
	props: CustomizedProps<T, P> & WritableInstanceProperties<CustomizedRef<T>>,
) => React.Element | undefined;
