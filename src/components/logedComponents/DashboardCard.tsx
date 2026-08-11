import { LucideIcon } from "lucide-react";

type DashboardCardVariant =
    | "success"
    | "danger"
    | "info"
    | "warning";

interface DashboardCardProps {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
    variant: DashboardCardVariant;
}

const variantStyles = {
    success: {
        icon: "bg-green-100 text-green-600",
        description: "bg-green-50 text-green-600",
    },

    danger: {
        icon: "bg-red-100 text-red-600",
        description: "bg-red-50 text-red-600",
    },

    info: {
        icon: "bg-blue-100 text-blue-600",
        description: "bg-blue-50 text-blue-600",
    },

    warning: {
        icon: "bg-yellow-100 text-yellow-600",
        description: "bg-yellow-50 text-yellow-600",
    },
};

export default function DashboardCard({
    title,
    value,
    description,
    icon: Icon,
    variant,
}: DashboardCardProps) {
    const styles = variantStyles[variant];

    return (
        <div
            className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-md
            "
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                        {value}
                    </h3>

                    <div className="mt-4">
                        <span
                            className={`
                                inline-flex
                                items-center
                                rounded-full
                                px-2.5
                                py-1
                                text-xs
                                font-medium
                                ${styles.description}
                            `}
                        >
                            {description}
                        </span>
                    </div>
                </div>
                <div
                    className={`
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${styles.icon}
                    `}
                >
                    <Icon
                        size={22}
                        strokeWidth={2}
                    />
                </div>

            </div>
        </div>
    );
}