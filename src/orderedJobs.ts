export class OrderedJobs {

    static getSequence(jobs: string): string {
        let jobsDependencies: any = this.getJobDependencies(jobs);
        let sequence: any = [];
        this.addJobsWithNoDependencies(jobsDependencies, sequence);
        jobsDependencies.forEach((job: any) => {
            if (job.dependency !== undefined) {
                let whereToInsert: number = sequence.indexOf(job.dependency) + 1;
                console.log(whereToInsert);
                sequence.splice(whereToInsert, 0, job.name);
            }
        })
        console.log(sequence);
        if (jobs !== "") return sequence.toString().replace(/,/g, "");

        return "";
    }

    private static addJobsWithNoDependencies(jobsDependencies: any, sequence: any) {
        jobsDependencies.forEach((job: any) => {
            console.log(job);
            if (job.dependency === undefined && sequence.indexOf(job.name) === -1) sequence.push(job.name);

        });
    }

    private static getJobDependencies(jobs: string): any {
        let jobsSequence: any = jobs.split("\n");
        jobsSequence = jobsSequence.map((job: any) => {
            let newJob: any = job.replace(/\W+/g, "");
            return {name: newJob[0], dependency: newJob[1]};
        })
        return jobsSequence;
    }
}
