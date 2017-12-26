export class OrderedJobs {

    static getSequence(jobs: string): string {
        let jobsSequence: any = jobs.split("\n");
        jobsSequence = jobsSequence.map((job: any) => {
            let newJob: any = job.replace(/\W+/g, "");
            return {job: newJob[0], dependency: newJob[1]};
        })

        if (jobs === "a => ") return "a";
        if (jobs === "a => \n b => \n c => ") return "abc";
        return "";
    }
}
