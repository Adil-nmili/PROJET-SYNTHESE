import ArticlesTable from '../../components/Partials/ArticlesTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'

const NewsPageDashboard = () => {
    return(<div className="flex flex-col items-center w-full min-h-screen">
    <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-2xl font-bold">Articles's contents</h1>
        <Tabs defaultValue="news" className="w-2/3">
            <TabsList  className="w-full">
                <TabsTrigger  value="news">News</TabsTrigger>
                <TabsTrigger value="match">Matchs Results</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="team">Teams</TabsTrigger>
                <TabsTrigger value="player">Players</TabsTrigger>
            </TabsList>
            <TabsContent value="news">
                <ArticlesTable />
            </TabsContent>
        </Tabs>
    </div>
</div>)
}

export default NewsPageDashboard