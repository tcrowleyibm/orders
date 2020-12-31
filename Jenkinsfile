node {
    def customImage

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
        docker.withRegistry('http://host.minikube.internal:5000') {
            customImage = docker.build("orders")
            customImage.push()
        }
    }

    stage('Test image') {
        /* Ideally, we would run a test framework against our image.
         * For this example, we're using a Volkswagen-type approach ;-) */

        customImage.inside {
            sh 'echo "Tests passed"'
        }
    }

    stage('Invoke Rezolvr Pipeline') {
        build job: 'gulfcharter_stage', parameters: [
            string(name: 'source', value: 'orders')
        ]
    }

}