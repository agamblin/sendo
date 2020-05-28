import { Link } from '@chakra-ui/core';
import { LinkProps } from '@chakra-ui/core/dist/Link';
import * as React from 'react';
import {
    Link as ReactRouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom';

type UILinkProps = LinkProps & RouterLinkProps;

/**
 * This is to work around the `as` prop needing generics.
 * @see https://github.com/chakra-ui/chakra-ui/issues/148#issuecomment-540457308
 */
export const UILink: React.FC<UILinkProps> = React.forwardRef(
    (props: UILinkProps, ref: React.Ref<any>) => {
        return (
            <Link
                ref={ref}
                as={(ReactRouterLink as unknown) as 'a'}
                {...props}
            />
        );
    }
);
