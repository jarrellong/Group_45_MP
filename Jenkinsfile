pipeline {
    agent any

    stages {
        stage('Execute Script') {
            steps {
                script {
                    // Specify the path to your local script
                    def scriptPath = '/home/ubuntu/jenkinscript1.sh'
                    def logFilePath = '/home/ubuntu/jenkins.log'

                    // Generate a timestamp
                    def timestamp = new Date().format('yyyyMMddHHmmss')

                    // Execute the script and append output to /home/ubuntu/jenkins.log
                    sh """bash ${scriptPath} >> ${logFilePath} 2>&1

                    # Print the log file content for debugging (optional)
                    cat ${logFilePath}

                    # Append timestamp to the log file
                    echo 'Timestamp: ${timestamp}' >> ${logFilePath}
                    """
                }
            }
        }
    }
}
