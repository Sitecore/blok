import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  "inline-flex h-10 min-w-10 px-4 py-2 has-[>svg]:px-4 items-center justify-center gap-2 whitespace-nowrap rounded-4xl text-md font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-600',
        outline:
          'border bg-backgrounds hover:bg-neutral-100 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        ghost: 'hover:bg-neutral-100 hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 min-w-10 px-4 py-2 has-[>svg]:px-4',
        sm: 'h-8 min-w-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-12 min-w-12 px-6 has-[>svg]:px-4',
        xs: 'h-6 min-w-6 px-2 has-[>svg]:px-2 text-sm',
        icon: 'size-9'
      },
      colorScheme: {
        primary: '',
        ai: 'bg-[length:250%_100%] !bg-transparent',
        danger: '',
        success: '',
        neutral: ''
      }
    },
    compoundVariants: [
      {
        variant: 'default',
        colorScheme: 'primary',
        class: 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700'
      },
      {
        variant: 'default',
        colorScheme: 'success',
        class: 'bg-success text-white hover:bg-success-600 active:bg-success-700'
      },
      {
        variant: 'default',
        colorScheme: 'danger',
        class: 'bg-danger text-white hover:bg-danger-600 active:bg-danger-700'
      },
      {
        variant: 'default',
        colorScheme: 'neutral',
        class: 'bg-neutral text-white hover:bg-neutral-600 active:bg-neutral-700'
      },
      {
        variant: 'default',
        colorScheme: 'ai',
        class: 'ai-500 text-white hover:ai-600 active:ai-700'
      },
      {
        variant: 'outline',
        colorScheme: 'primary',
        class: 'border text-primary-600 hover:bg-primary-100 hover:text-primary-600 active:bg-primary-200'
      },
      {
        variant: 'outline',
        colorScheme: 'success',
        class: 'border text-success-600 hover:bg-success-100 hover:text-success-600 active:bg-success-200'
      },
      {
        variant: 'outline',
        colorScheme: 'danger',
        class: 'border text-danger-600 hover:bg-danger-100 hover:text-danger-600 active:bg-danger-200'
      },
      {
        variant: 'outline',
        colorScheme: 'neutral',
        class: 'border text-neutral-600 hover:bg-neutral-100 hover:text-neutral-600 active:bg-neutral-200'
      },
      {
        variant: 'ghost',
        colorScheme: 'primary',
        class: 'text-primary-600 hover:bg-primary-100 hover:text-primary-600 active:bg-primary-200'
      },
      {
        variant: 'ghost',
        colorScheme: 'success',
        class: 'text-success-600 hover:bg-success-100 hover:text-success-600 active:bg-success-200'
      },
      {
        variant: 'ghost',
        colorScheme: 'danger',
        class: 'text-danger-600 hover:bg-danger-100 hover:text-danger-600 active:bg-danger-200'
      },
      {
        variant: 'ghost',
        colorScheme: 'neutral',
        class: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-600 active:bg-neutral-200'
      },
      {
        variant: 'link',
        colorScheme: 'primary',
        class: 'text-primary active:text-primary-700'
      },
      {
        variant: 'link',
        colorScheme: 'success',
        class: 'text-success active:text-success-700'
      },
      {
        variant: 'link',
        colorScheme: 'danger',
        class: 'text-danger active:text-danger-700'
      },
      {
        variant: 'link',
        colorScheme: 'neutral',
        class: 'text-neutral active:text-neutral-700'
      }
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      colorScheme: 'primary'
    }
  }
);

function Button({
  className,
  variant,
  size,
  colorScheme,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  let resolvedColorSchemeFinal = colorScheme;

  if (!colorScheme) {
    switch (variant) {
      case 'default':
      case 'link':
        resolvedColorSchemeFinal = 'primary';
        break;
      case 'outline':
      case 'ghost':
        resolvedColorSchemeFinal = 'neutral';
        break;
      default:
        resolvedColorSchemeFinal = 'primary';
    }
  }

  return (
    <Comp
      data-slot='button'
      className={cn(
        buttonVariants({
          variant,
          size,
          colorScheme: resolvedColorSchemeFinal,
          className
        })
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
