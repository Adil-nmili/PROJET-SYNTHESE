import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import NewsForm from "../../components/Partials/NewsForm";
import ResultMatchsForm from "../../components/Partials/ResultMatchsForm";
const CreateArticles = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-2xl font-bold">Create Articles</h1>
            <Tabs defaultValue="news" className="w-2/3">
                <TabsList  className="w-full">
                    <TabsTrigger  value="news">News</TabsTrigger>
                    <TabsTrigger value="match">Matchs Results</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="team">Teams</TabsTrigger>
                    <TabsTrigger value="player">Players</TabsTrigger>
                </TabsList>
                <TabsContent value="news">
                    <NewsForm />
                </TabsContent>
                <TabsContent value="match">
                    <ResultMatchsForm />
                </TabsContent>
            </Tabs>
        </div>
    </div>
  )
}

export default CreateArticles