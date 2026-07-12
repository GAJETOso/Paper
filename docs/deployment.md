# Deployment

## Environments & branches (GitFlow)

| Environment | Branch      | Trigger                                          |
| ----------- | ----------- | ------------------------------------------------ |
| Preview     | PR branches | CI build                                         |
| Staging     | `staging`   | push                                             |
| Production  | `main`      | GitHub Release (semantic-release) → `deploy.yml` |

## Docker

```bash
docker build -f docker/Dockerfile -t sylvara/website .            # website
docker build -f docker/Dockerfile.service --build-arg APP=whatsapp-bot -t sylvara/whatsapp-bot .
docker compose -f docker/docker-compose.prod.yml up -d
```

Images are published to GHCR by `.github/workflows/docker.yml` on every
release tag.

## Kubernetes

```bash
kubectl apply -k infrastructure/kubernetes/
kubectl -n sylvara create secret generic platform-secrets --from-env-file=.env.production
kubectl -n sylvara rollout status deployment/website
```

Includes: namespace, ConfigMap, website Deployment (3 replicas, probes,
non-root), Service, HPA (3–20 pods), bots + services deployments, NGINX
ingress with cert-manager TLS and rate limiting, PVC template.

## Cloud provisioning

Terraform reference stacks in `infrastructure/terraform/{aws,azure,gcp}` —
see that directory's README. Provision infra first, then point `KUBE_CONFIG`
(GitHub environment secret) at the cluster for `deploy.yml`.

## Zero-downtime & rollback

RollingUpdate with `maxUnavailable: 0`; deploy job gates on `/api/health`.
Rollback: `kubectl -n sylvara rollout undo deployment/website` or re-run the
deploy workflow on the previous release.
