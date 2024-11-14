/* eslint-disable @typescript-eslint/no-explicit-any */
import Roact, { Element, PropsWithChildren } from "@rbxts/roact";
import { WriteableStyle } from "theme/interfaces";

export interface CommonProps<T extends Instance> extends PropsWithChildren {
	className?: WriteableStyle<T>;
	component?: T;
	children?: Roact.Children;
}

export type BaseDefaultProps<T extends Instance, P> = CommonProps<T> & P;

export type BaseCustomizedProps<T extends Instance, P> = BaseDefaultProps<T, P>;

export type DefaultProps<T extends Instance, P = {}> = BaseDefaultProps<T, P>;

export type CustomizedProps<T extends Instance, P = {}> = BaseCustomizedProps<T, P>;

export type CustomizedRef<T extends Instance> = T extends Instance
	? any
	: T extends keyof Roact.JsxInstance<T>
	? WritableInstanceProperties<T>
	: never;

export type CustomizedForwardRefComponent<D extends Instance, P = {}> = <T extends Instance = D>(
	props: PropsWithChildren<CustomizedProps<T, P>> & WritableInstanceProperties<CustomizedRef<T>>,
) => Element | undefined;
