import { ReactNode, forwardRef } from 'react';
import clsx from 'clsx';
import { Spinner } from '~/components/elements';
import { ICONS } from '~/assets/icons';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: 'bg-primary-500' | 'bg-secondary-500';
    size?: 'btn-sm' | 'btn-md' | 'btn-lg';
    isLoading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const {
            children,
            type = 'button',
            variant = 'bg-primary-500',
            size = 'btn-md',
            className,
            isLoading = false,
            ...rest
        } = props;

        return (
            <button
                ref={ref}
                type={type}
                disabled={isLoading}
                className={clsx(
                    'btn',
                    'w-full rounded-md border border-primary-500 bg-primary-500 px-5 text-base text-white transition hover:bg-opacity-90',
                    size,
                    variant,
                    className
                )}
                {...rest}
            >
                {type === 'submit' ? (
                    isLoading ? (
                        <Spinner size="sm" variant="light" />
                    ) : (
                        children
                    )
                ) : (
                    children
                )}
            </button>
        );
    }
);

type CustomButtonProps = {
    onClick?: () => void;
};

export const ExportButton = (props: CustomButtonProps) => {
    const { onClick } = props;
    return (
        <button
            className="bg-secondary-700 flex items-center justify-center gap-2
rounded-md px-10 py-3 text-sm font-semibold text-primary-500"
            onClick={onClick}
        >
            <img src={ICONS.Export} alt="Export Logo" />
            EXPORT IN EXCEL
        </button>
    );
};

export const AddNewButton = (props: CustomButtonProps) => {
    const { onClick } = props;
    return (
        <button
            className="flex items-center justify-center gap-2 rounded-md
bg-primary-500 px-10 py-3 text-sm font-semibold text-white"
            onClick={onClick}
        >
            <img src={ICONS.Add} alt="Add Logo" />
            ADD NEW
        </button>
    );
};

export const RevokeButton = (props: CustomButtonProps) => {
    const { onClick } = props;

    return (
        <button
            className="bg-danger-500 h-6 w-6 rounded-md p-1"
            onClick={onClick}
        >
            <img src={ICONS.Cross} alt="Cancel" className="w-full" />
        </button>
    );
};

export const GrantButton = (props: CustomButtonProps) => {
    const { onClick } = props;

    return (
        <button
            className="bg-success-500 h-6 w-6 rounded-md p-1"
            onClick={onClick}
        >
            <img src={ICONS.Tick} alt="Accept" className="w-full" />
        </button>
    );
};

export const BookEditButton = (props: CustomButtonProps) => {
    const { onClick } = props;

    return (
        <button
            className="bg-success-500 h-6 w-6 rounded-md p-1"
            onClick={onClick}
        >
            <img src={ICONS.BookEdit} alt="BookEdit" className="w-full" />
        </button>
    );
};

export const DeleteButton = (props: CustomButtonProps) => {
    const { onClick } = props;

    return (
        <button
            className="bg-danger-500 h-6 w-6 rounded-md p-1"
            onClick={onClick}
        >
            <img src={ICONS.Trash} alt="Delete" className="w-full" />
        </button>
    );
};

export const ViewButton = (props: CustomButtonProps) => {
    const { onClick } = props;

    return (
        <button
            className="bg-success-500 h-6 w-6 rounded-md p-1"
            onClick={onClick}
        ></button>
    );
};
