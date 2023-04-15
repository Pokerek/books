const checkRequiredEnvVars = (envVars: string[]) => {
  const missingEnvVars = envVars.filter((envVar) => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingEnvVars.join(', ')}`
    );
  }
};

export default checkRequiredEnvVars;
