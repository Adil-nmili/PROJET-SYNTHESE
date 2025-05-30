import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import NewsForm from "../../components/Partials/NewsForm";
import ResultMatchsForm from "../../components/Partials/ResultMatchsForm";
import PlayerStatsForm from "../../components/Partials/PlayerStatsForm";
import MatchCalendarForm from '../../components/Partials/MatchCalendarForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import { TeamInfoForm } from '../../components/Partials/TeamInfoForm';

const CreateArticles = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-2xl font-bold">Create Articles</h1>
            <Tabs defaultValue="news" className="w-2/3">
                <TabsList className="w-full">
                    <TabsTrigger value="news">News</TabsTrigger>
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
                <TabsContent value="player">
                    <PlayerStatsForm />
                </TabsContent>
                <TabsContent value="calendar">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Match Calendar</CardTitle>
                            <CardDescription>
                                Add upcoming matches to the calendar
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MatchCalendarForm />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="team">
                    <TeamInfoForm />
                </TabsContent>
            </Tabs>
        </div>
    </div>
  )
}

export default CreateArticles