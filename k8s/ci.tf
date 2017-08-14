terraform {
  backend "s3" {
    bucket = "clusters.spaperf.com"
    key = "cicd"  
    region = "ap-northeast-2"
  }
}
