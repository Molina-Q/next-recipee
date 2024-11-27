import { Tool, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Tool[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tool`, { method: 'GET' });
    const data = await response.json();
    const dataResponse = data.data;

    return dataResponse;
}

export default async function Dashboard() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}