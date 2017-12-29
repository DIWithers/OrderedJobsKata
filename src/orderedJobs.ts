export class OrderedJobs {

    static getSequence(jobs: string): string {
        let jobsDependencies: any = this.getJobDependencies(jobs);
        let sequence: any = [];
        if (jobs === "") return "";
        if (this.jobHasInvalidDependency(jobsDependencies)) return "Error: Jobs cannot depend on themselves.";
        this.addJobsWithNoDependencies(jobsDependencies, sequence);
        this.addJobsWithDependencies(jobsDependencies, sequence);
        return sequence.toString().replace(/,/g, "");
    }

    private static jobHasInvalidDependency(jobsDependencies: any): boolean {
        return Array.from(jobsDependencies.keys()).some((job: any) => jobsDependencies[job].name === jobsDependencies[job].dependency);
    }

    private static addJobsWithDependencies(jobsDependencies: any, sequence: any): any {
        jobsDependencies.forEach((job: any) => {
            if (job.dependency !== undefined) {
                if (sequence.indexOf(job.dependency) === -1) sequence.push(job.dependency);
                let whereToInsert: number = sequence.indexOf(job.dependency) + 1;
                if (sequence.indexOf(job.name) === -1) sequence.splice(whereToInsert, 0, job.name);
            }
        });
    }

    private static addJobsWithNoDependencies(jobsDependencies: any, sequence: any): any {
        jobsDependencies.forEach((job: any) => {
            if (job.dependency === undefined && sequence.indexOf(job.name) === -1) sequence.push(job.name);

        });
    }

    private static getJobDependencies(jobs: string): any {
        let jobsDependencies: any = jobs.split("\n");
        jobsDependencies = jobsDependencies.map((job: any) => {
            let newJob: any = job.replace(/\W+/g, "");
            return {name: newJob[0], dependency: newJob[1]};
        })
        return jobsDependencies;
    }
}
