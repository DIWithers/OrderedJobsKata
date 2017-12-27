export class OrderedJobs {

    static getSequence(jobs: string): string {
        let jobsSequence: any = this.getJobSequence(jobs);
        let sequence: any = "";
        // console.log(jobsSequence);
        // for (let name of Array.from(jobsSequence.entries())) {
        //     // console.log(name);
        // }
        jobsSequence.forEach((job: any) => {
            console.log(job);
            if (job.dependency === undefined && sequence.indexOf(job.name) === -1) sequence += job.name;

            if (job.dependency !== undefined) {
                sequence += job.dependency;
                sequence += job.name;
            }
            //
            // // if (job.dependency !== undefined) sequence.slice(0, 1) + job.name + sequence.slice(1);

        });
        if (jobs !== "") return sequence;
        // console.log(sequence);
        // if (jobs === "a => ") return "a";
        // if (jobs === "a => \n b => \n c => ") return "abc";
        return "";
    }

    private static getJobSequence(jobs: string): any {
        let jobsSequence: any = jobs.split("\n");
        jobsSequence = jobsSequence.map((job: any) => {
            let newJob: any = job.replace(/\W+/g, "");
            return {name: newJob[0], dependency: newJob[1]};
        })
        return jobsSequence;
    }
}
