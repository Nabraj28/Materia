import React from "react";

type TableRow = Record<string, string | number | boolean | null>;

type DataTableProps = {
    group: {
        id: string;
        groupName?: string;
        columns: string[];
        rows: unknown;
    };
};

const DataTable: React.FunctionComponent<DataTableProps> = ({ group }) => {

    if (!group.columns?.length) return null;

    const rows = Array.isArray(group.rows)
        ? (group.rows as unknown as TableRow[])
        : [];

    return (
        <section className="space-y-4">
            {group.groupName && (
                <h2 className="text-xl font-bold">{group.groupName}</h2>
            )}

            <div className="border border-gray-200 rounded overflow-x-auto">
                <table className="w-full text-left font-mono text-[13px] min-w-125">

                    {/* Header */}
                    <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                        {group.columns.map((col, idx) => (
                            <th key={idx} className="py-2.5 px-4 text-xs font-semibold text-gray-700">
                                {col}
                            </th>
                        ))}
                    </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                    {rows.map((row, i) => (
                        <tr
                            key={i}
                            className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                            {group.columns.map((col, idx) => (
                                <td key={idx} className="py-2.5 px-4">
                                    {row[col] ?? "-"}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        </section>
    );
};

export default DataTable;